const { Document } = require("../models");

const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const getAllDocuments = async (req, res) => {
  const { topic } = req.query;
  let queryObject = {};

  if (topic) queryObject.topic = topic;

  const documents = await Document.find(queryObject).sort({topic: 1, order: 1});

  return res.status(StatusCodes.OK).json({documents, count: documents.length})
}

const getSingleDocument = async (req, res) => {
  let {id: documentId} = req.params;
  const document = await Document.findOne({_id: documentId});

  if (!document) {
    throw new CustomError.NotFoundError(`There is no document with ${documentId}`);
  }

  return res.status(StatusCodes.OK).json({document});
}

const createDocument = async (req, res) => {
  const foundDocument = await Document.find({topic: req.body.topic});
  console.log(foundDocument)
  if (foundDocument.length > 0) {
    req.body.version = foundDocument[0].version;
    req.body.order = foundDocument.length + 1;
  }
  const newDocument = await Document.create(req.body);

  return res.status(StatusCodes.CREATED).json({document: newDocument});
}

const updateDocument = async (req, res) => {
  const {id: documentId} = req.params;
  const document = await Document.findOne({_id: documentId});
  
  if (!document) {
    throw new CustomError.NotFoundError(`There is no document with ${documentId}`);
  }

  req.body.version = document.version + 1;

  const updatedDocument = await Document.findOneAndUpdate(
    {_id: documentId},
    req.body,
    { new: true, runValidators: true}
  );

  const documents = await Document.updateMany({topic: updatedDocument.topic}, {version: updatedDocument.version});
  console.log(documents);
  return res.status(StatusCodes.OK).json({document: updatedDocument});
}

const deleteDocument = async (req, res) => {
  const {id: documentId} = req.params;

  const deletedDocument = await Document.findOneAndDelete({_id: documentId});

  return res.status(StatusCodes.OK).json({message: `${deletedDocument.topic} - ${deletedDocument.content} is removed`})
}

module.exports = {
  getAllDocuments,getSingleDocument, createDocument, updateDocument,deleteDocument
}