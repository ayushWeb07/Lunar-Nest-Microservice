import { AbstractSchema } from '@app/shared/database/abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';
import { Model, QueryFilter, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractRepository<TDocument extends AbstractSchema> {
  protected abstract readonly logger: Logger;

  constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const newModel = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });

    return (await newModel.save()).toJSON() as unknown as TDocument;
  }

  async findOne(queryFilter: QueryFilter<TDocument>): Promise<TDocument> {
    const doc = await this.model.findOne(queryFilter, {}, { lean: true });

    if (!doc) {
      this.logger.warn(`Document not found with query filter`);
      throw new NotFoundException(`Document not found`);
    }

    return doc as unknown as TDocument;
  }

  async findOneAndUpdate(
    queryFilter: QueryFilter<TDocument>,
    updateQuery: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const doc = await this.model.findOneAndUpdate(queryFilter, updateQuery, {
      lean: true,
      new: true,
    });

    if (!doc) {
      this.logger.warn(`Document not found for update`);
      throw new NotFoundException(`Document not found for update`);
    }

    return doc as unknown as TDocument;
  }

  async find(queryFilter: QueryFilter<TDocument>): Promise<TDocument[]> {
    const docs = await this.model.find(queryFilter, {}, { lean: true });

    return docs as unknown as TDocument[];
  }

  async findOneAndDelete(
    queryFilter: QueryFilter<TDocument>,
  ): Promise<TDocument> {
    const doc = await this.model.findOneAndDelete(queryFilter, { lean: true });

    if (!doc) {
      this.logger.warn(`Document not found for delete`);
      throw new NotFoundException(`Document not found for delete`);
    }

    return doc as unknown as TDocument;
  }
}
