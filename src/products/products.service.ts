import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // suponiendo que usas Prisma
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    // Busca producto por nombre
    const existing = await this.prisma.product.findUnique({
      where: { name: dto.name },
    });
    if (existing) {
      throw new ConflictException('El producto con ese nombre ya existe');
    }
    // Crea producto
    return this.prisma.product.create({ data: dto });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException('Producto no encontrado');
    }
    return product;
  }

  async findAll() {
    return this.prisma.product.findMany();
  }
}
