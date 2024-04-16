import { ApiResponseOptions } from '@nestjs/swagger';

export const swaggerConst = {
  tag: {
    name: 'Name',
  },

  apiResponse: {
    badRequest: {
      description:
        'The request was invalid and/or malformed. The response will contain an Errors JSON Object with the specific errors',
    } as ApiResponseOptions,

    notFound: {
      description: "The object doesn't exist.",
    } as ApiResponseOptions,

    forbidden: {
      description: 'The request was not allow',
    } as ApiResponseOptions,

    internalServerError: {
      description: 'There was an internal error',
    } as ApiResponseOptions,

    tooManyRequests: {
      description:
        'Rate limit threshold exceeded. The response contain a retryAfter header, indicating how long to wait before making a new request.',
      headers: {
        retryAfter: {
          name: 'retry-after',
          description:
            "Indicates how many seconds the user agent should wait before making a follow-up request. Syntax 'Retry-After: delay-seconds'",
        },
      },
    } as ApiResponseOptions,
  },
};
