import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1598435903698
  implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'appointments',
      'provider',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentsProvider',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentsProvider');

    await queryRunner.renameColumn(
      'appointments',
      'provider_id',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
