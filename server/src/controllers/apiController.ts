import * as Joi from 'joi';

import AppError from '../appError';
import helper from './_controllerHelper';
import userRepository from '../repositories/userRepository';
import categoryRepository from '../repositories/categoryRepository';
import recordRepository from '../repositories/recordRepository';

export default {
  currentUser,
  categoryList,
  saveCategory,
  deleteCategory,
  recordList,
  saveRecord,
  deleteRecord
};

async function currentUser(req, res) {
  try {
    const userId = helper.getCurrentUser(req)._id;

    const user = await userRepository.getUserById(userId);

    return helper.sendData(user, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function categoryList(req, res) {
  try {
    const userId = helper.getCurrentUser(req)._id;

    const records = await categoryRepository.getCategories(userId);

    return helper.sendData(records, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function saveCategory(req, res) {
  try {
    const data = await helper.loadSchema(req.body, {
      category: Joi.object().keys({
        id: Joi.string().allow(null),
        title: Joi.string().required(),
        description: Joi.string().required()
      })
    });

    const userId = helper.getCurrentUser(req)._id;

    let category = null;

    if (data.category.id) {
      await assertUserOwnsCategory(userId, data.category.id);

      category = await categoryRepository.updateCategory(data.category);
    } else {
      category = await categoryRepository.addCategory(userId, data.category);
    }

    return helper.sendData(category, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function deleteCategory(req, res) {
  try {
    const data = await helper.loadSchema(req.params, {
      id: Joi.string().required()
    });

    await assertUserOwnsCategory(helper.getCurrentUser(req)._id, data.id);

    await assertCategoryHasNoRecords(data.id);

    await categoryRepository.removeCategory(data.id);

    return helper.sendData({}, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function recordList(req, res) {
  try {
    const searchQuery = await helper.loadSchema(req.query, {
      sortBy: Joi.string().required()
    });

    const userId = helper.getCurrentUser(req)._id;

    const records = await recordRepository.getRecords(userId, searchQuery);

    return helper.sendData(records, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function saveRecord(req, res) {
  try {
    const data = await helper.loadSchema(req.body, {
      record: Joi.object().keys({
        id: Joi.string().allow(null),
        date: Joi.date().required(),
        categoryId: Joi.string().required(),
        cost: Joi.number().required(),
        note: Joi.string().required()
      })
    });

    const userId = helper.getCurrentUser(req)._id;

    let record = null;

    if (data.record.id) {
      await assertUserOwnsRecord(userId, data.record.id);

      record = await recordRepository.updateRecord(data.record);
    } else {
      record = await recordRepository.addRecord(userId, data.record);
    }

    return helper.sendData(record, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function deleteRecord(req, res) {
  try {
    const data = await helper.loadSchema(req.params, {
      id: Joi.string().required()
    });

    await assertUserOwnsRecord(helper.getCurrentUser(req)._id, data.id);

    await recordRepository.removeRecord(data.id);

    return helper.sendData({}, res);
  } catch (err) {
    return helper.sendFailureMessage(err, res);
  }
}

async function assertUserOwnsCategory(userId, categoryId) {
  const category = await categoryRepository.getCategoryById(categoryId);

  const hasRights = category && category.userId.toString() === userId;

  if (!hasRights) throw new AppError('User does not own category');
}

async function assertUserOwnsRecord(userId, recordId) {
  const record = await recordRepository.getRecordById(recordId);

  const hasRights = record && record.userId.toString() === userId;

  if (!hasRights) throw new AppError('User does not own record');
}

async function assertCategoryHasNoRecords(categoryId) {
  const records = await recordRepository.getRecordsByCategoryId(categoryId);

  const hasRecords = records && records.length;

  if (hasRecords) throw new AppError('Cannot delete category with records.');
}
