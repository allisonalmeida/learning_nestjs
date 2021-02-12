import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.model';
import { Repository } from 'typeorm';

@Controller('products')
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private produtcRepo: Repository<Product>,
  ) {}

  @Get()
  index() {
    return this.produtcRepo.find();
  }

  @Get(':id')
  show(@Param('id') id: string) {
    return this.produtcRepo.findOneOrFail(id);
  }

  @Post()
  store(@Body() body) {
    const product = this.produtcRepo.create(body);
    return this.produtcRepo.save(product);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body) {
    await this.produtcRepo.findOneOrFail(id);
    this.produtcRepo.update({ id: +id }, body);
    return await this.produtcRepo.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.produtcRepo.findOneOrFail(id);
    this.produtcRepo.delete({ id: +id });
  }
}
