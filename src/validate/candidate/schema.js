export function makeCandidateSchema(joi) {
  const ddMMyyyy = /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/;
  const phone = /^(09|05|08|03|07)+([0-9]{8})$/;
  const schema = {
    'A': joi.number().min(0).optional().label('[A]National ID'),
    'B': joi.string().label('[B]Account').trim().options({ convert: true }),
    'C': joi.string().required().label('[C]Name').trim().options({ convert: true }),
    'D': joi.string().allow(joi.ref('$listUniversityName')).label('[D]University').trim().options({ convert: true }),
    'E': joi.string().allow(joi.ref('$listFacultyCode')).label('[E]Faculty').trim(),
    'F': joi.string().label('[F]dob').optional().regex(ddMMyyyy, 'dd-MM-YYYY').options({ convert: true }),
    'G': joi.string().allow(['male', 'female']).label('[G]Gender').optional(),
    'H': joi.string().email().label('[H]Email').trim(),
    'I': joi.string().label('[I]Phone').regex(phone),
    'J': joi.string().optional().trim().label('[J]Facebook'),
    'K': joi.number().optional().label('[K]University graduation date'),
    'L': joi.string().regex(ddMMyyyy, 'dd-MM-YYYY').optional().label('[L]Full-time working available date'),
    'N': joi.string().allow(joi.ref('$listCourseCode')).trim().label('[N]Course Code'),
    'U': joi.string().allow(joi.ref('$listStatus')).trim().label('[U]Status'),
    'V': joi.number().positive().label('[V]Final Grade').optional().default(0, 'Default value for Final Grade').options({ convert: true }).allow(null),
    'W': joi.string().trim().optional().label('[W]Completion Level'),
    'X': joi.string().trim().optional().label('[X]Certificate ID'),
    'Y': joi.string().trim().label('[Y]Updated by').optional(),
    //'Z': joi.date().options({ convert: true }).format('DD-MMM-YYYY').label('[Z]Updated date').optional(),
    'Z': joi.string().regex(ddMMyyyy, 'dd-MM-YYYY').label('[Z]Updated date').optional(),
    'AA': joi.string().optional().label('[AA]Note'),
    'AF': joi.string().required().label('[AF]1st contract Type').allow(joi.ref('$listContactType')).optional(),
    'AN': joi.number().optional().label('[AN]GPA'),
  }
  return schema;
}
