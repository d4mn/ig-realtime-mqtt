/// <reference types="node" />
export interface GraphQLTransformerResult<T> {
    topic: string;
    message: T;
}
export declare function graphqlTransformer<T>(data: Buffer): GraphQLTransformerResult<T>;
//# sourceMappingURL=graphql.transformer.d.ts.map