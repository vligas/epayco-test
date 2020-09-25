import { EntityManager } from "typeorm";

export async function createDbTransaction(manager: EntityManager, callback: (tx: EntityManager) => any): Promise<any> {
    if (manager.queryRunner?.isTransactionActive) {
        return await callback(manager)
    }
    else {
        return await manager.transaction(callback)
    }
} 