import { Test, TestingModule } from '@nestjs/testing';
import { SelectedProductsController } from './selected-products.controller';

describe('SelectedProducts Controller', () => {
  let controller: SelectedProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelectedProductsController],
    }).compile();

    controller = module.get<SelectedProductsController>(SelectedProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
