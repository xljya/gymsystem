import { generateService } from '@umijs/openapi';

generateService({
  requestLibPath: "import request from '@/utils/request'",
  schemaPath: 'http://localhost:8080/api/v2/api-docs',
  serversPath: './src',
});
