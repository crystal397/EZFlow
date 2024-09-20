/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        createMany: procedure.input($Schema.WorkflowExecutionInputSchema.createMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowExecution.createMany(input as any))),

        create: procedure.input($Schema.WorkflowExecutionInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowExecution.create(input as any))),

        deleteMany: procedure.input($Schema.WorkflowExecutionInputSchema.deleteMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowExecution.deleteMany(input as any))),

        delete: procedure.input($Schema.WorkflowExecutionInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowExecution.delete(input as any))),

        findFirst: procedure.input($Schema.WorkflowExecutionInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).workflowExecution.findFirst(input as any))),

        findMany: procedure.input($Schema.WorkflowExecutionInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).workflowExecution.findMany(input as any))),

        findUnique: procedure.input($Schema.WorkflowExecutionInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).workflowExecution.findUnique(input as any))),

        updateMany: procedure.input($Schema.WorkflowExecutionInputSchema.updateMany).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowExecution.updateMany(input as any))),

        update: procedure.input($Schema.WorkflowExecutionInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).workflowExecution.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    createMany: {

        useMutation: <T extends Prisma.WorkflowExecutionCreateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowExecutionCreateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowExecutionCreateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowExecutionCreateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    create: {

        useMutation: <T extends Prisma.WorkflowExecutionCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowExecutionCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WorkflowExecutionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WorkflowExecutionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowExecutionCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowExecutionCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WorkflowExecutionGetPayload<T>, Context>) => Promise<Prisma.WorkflowExecutionGetPayload<T>>
            };

    };
    deleteMany: {

        useMutation: <T extends Prisma.WorkflowExecutionDeleteManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowExecutionDeleteManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowExecutionDeleteManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowExecutionDeleteManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    delete: {

        useMutation: <T extends Prisma.WorkflowExecutionDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowExecutionDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WorkflowExecutionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WorkflowExecutionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowExecutionDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowExecutionDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WorkflowExecutionGetPayload<T>, Context>) => Promise<Prisma.WorkflowExecutionGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.WorkflowExecutionFindFirstArgs, TData = Prisma.WorkflowExecutionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.WorkflowExecutionFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WorkflowExecutionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WorkflowExecutionFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WorkflowExecutionFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WorkflowExecutionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WorkflowExecutionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.WorkflowExecutionFindManyArgs, TData = Array<Prisma.WorkflowExecutionGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.WorkflowExecutionFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.WorkflowExecutionGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WorkflowExecutionFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WorkflowExecutionFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.WorkflowExecutionGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.WorkflowExecutionGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.WorkflowExecutionFindUniqueArgs, TData = Prisma.WorkflowExecutionGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.WorkflowExecutionFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.WorkflowExecutionGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.WorkflowExecutionFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.WorkflowExecutionFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.WorkflowExecutionGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.WorkflowExecutionGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    updateMany: {

        useMutation: <T extends Prisma.WorkflowExecutionUpdateManyArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowExecutionUpdateManyArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.BatchPayload,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.BatchPayload, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowExecutionUpdateManyArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowExecutionUpdateManyArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.BatchPayload, Context>) => Promise<Prisma.BatchPayload>
            };

    };
    update: {

        useMutation: <T extends Prisma.WorkflowExecutionUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.WorkflowExecutionUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.WorkflowExecutionGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.WorkflowExecutionGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.WorkflowExecutionUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.WorkflowExecutionUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.WorkflowExecutionGetPayload<T>, Context>) => Promise<Prisma.WorkflowExecutionGetPayload<T>>
            };

    };
}
