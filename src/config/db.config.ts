import { Type } from "@nestjs/common";

export const getConfig = (entities: Type[]): any => {
    const env = process.env.NODE_ENV;
    const config = {
        synchronize: false,
    };

    switch (env) {
        case 'development':
            Object.assign(config, {
                type: 'sqlite',
                database: 'db.sqlite',
                entities
            });
            break;
        case 'production':
            Object.assign(config, {
                type: 'postgres',
                url: process.env.DATABASE_URL,
                migrationsRun: true,
                entities,
                ssl: {
                    rejectUnauthorized: false
                }
            });
            break;
        default:
            throw new Error(`unknown node environment: ${env}`);
    }

    return config;
}