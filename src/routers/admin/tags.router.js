const allTags = require('express').Router()

const tagsController = require('../../controllers/admin/tags.controller')

allTags.get('/', tagsController.getAllTags)
allTags.get('/:id', tagsController.getTagsId)
allTags.post('/', tagsController.createTags)
allTags.patch('/:id', tagsController.updateTags)
allTags.delete('/:id', tagsController.deleteTags)

module.exports = allTags
