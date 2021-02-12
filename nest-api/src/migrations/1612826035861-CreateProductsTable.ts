import { identity } from 'rxjs';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProductsTable1612826035861 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        columns: [
          {
            isPrimary: true,
            name: 'id',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            length: '25',
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'double precision',
          },
          {
            default: 'CURRENT_TIMESTAMP',
            name: 'created_at',
            type: 'timestamp',
          },
        ],
        name: 'products',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
