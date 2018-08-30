import request from '@/utils/request'

export function queryByKeyWords(req) {
  return request({
    url: '/questionnaire/query',
    method: 'get',
    params: {
      name: req.name,
      modifier: req.modifier,
      beginTime: req.beginTime,
      afterTime: req.afterTime,
      pageNo: req.pageNo,
      pageSize: req.pageSize
    }
  })
}

export function generateQuestionnaire(questionnaireName, singleItems, multiItems, fillBlanks) {
  return request({
    url: '/questionnaire/generate',
    method: 'post',
    data: {
      questionnaireName: questionnaireName,
      singleItems: singleItems,
      multiItems: multiItems,
      fillBlanks: fillBlanks
    }
  })
}

export function deleteOneQuestionnaire(id) {
  return request({
    url: '/questionnaire/deleteOne',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function deleteQuestionnaires(ids) {
  return request({
    url: '/questionnaire/batchdelete',
    method: 'post',
    data: {
      ids: ids
    }
  })
}

export function queryOneQuestionnaire(id) {
  return request({
    url: '/questionnaire/queryOne',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function modifyQuestionnaire(editQuestionnaireId, questionnaireName, singleItems, multiItems, fillBlanks) {
  return request({
    url: '/questionnaire/modifyQuestionnaire',
    method: 'post',
    data: {
      editQuestionnaireId: editQuestionnaireId,
      questionnaireName: questionnaireName,
      singleItems: singleItems,
      multiItems: multiItems,
      fillBlanks: fillBlanks
    }
  })
}