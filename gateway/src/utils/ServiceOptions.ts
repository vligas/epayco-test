import { EntityManager } from "typeorm";

export interface ServiceOptions {
    db: EntityManager
}