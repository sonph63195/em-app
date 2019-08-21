import joiBase from '@hapi/joi';
import joiDate from '@hapi/joi-date';
const joi = joiBase.extend(joiDate);

const candidateSchema = require('./schema').makeCandidateSchema(joi);

export function validateCandidate(candidate, context, callback) {  
  joi.validate(candidate, candidateSchema, context, callback);
}