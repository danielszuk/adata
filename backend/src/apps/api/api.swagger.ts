import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default async (app: any) => {
  const options = new DocumentBuilder()
    .setTitle('Adata Backend')
    .setDescription('Adata Backend API\'s description')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};
