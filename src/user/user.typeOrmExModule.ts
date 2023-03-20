import { DynamicModule, Provider } from "@nestjs/common";


export class TypeOrmExModule {
    public static forCustomRepository<T extends new (...args: any[]) => any> (repositories: T[]): DynamicModule {
        const providers: Provider[] = [];
    }
}