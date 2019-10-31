import { Test, TestingModule } from '@nestjs/testing';
import { SelectedProductsService } from './selected-products.service';

describe('SelectedProductsService', () => {
  let service: SelectedProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SelectedProductsService],
    }).compile();

    service = module.get<SelectedProductsService>(SelectedProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
