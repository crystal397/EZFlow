/* eslint-disable */
import type { unsetMarker, AnyRouter, AnyRootConfig, CreateRouterInner, Procedure, ProcedureBuilder, ProcedureParams, ProcedureRouterRecord, ProcedureType } from "@trpc/server";
import type { PrismaClient } from "@prisma/client";
import createWorkflowRouter from "./Workflow.router";
import createWorkflowStepRouter from "./WorkflowStep.router";
import createWorkflowExecutionRouter from "./WorkflowExecution.router";
import createIntegrationRouter from "./Integration.router";
import createApiKeyRouter from "./ApiKey.router";
import createSubscriptionRouter from "./Subscription.router";
import createBillingDataRouter from "./BillingData.router";
import createOrganizationRouter from "./Organization.router";
import createOrganizationRoleRouter from "./OrganizationRole.router";
import createUserRouter from "./User.router";
import createAccountRouter from "./Account.router";
import createSessionRouter from "./Session.router";
import { ClientType as WorkflowClientType } from "./Workflow.router";
import { ClientType as WorkflowStepClientType } from "./WorkflowStep.router";
import { ClientType as WorkflowExecutionClientType } from "./WorkflowExecution.router";
import { ClientType as IntegrationClientType } from "./Integration.router";
import { ClientType as ApiKeyClientType } from "./ApiKey.router";
import { ClientType as SubscriptionClientType } from "./Subscription.router";
import { ClientType as BillingDataClientType } from "./BillingData.router";
import { ClientType as OrganizationClientType } from "./Organization.router";
import { ClientType as OrganizationRoleClientType } from "./OrganizationRole.router";
import { ClientType as UserClientType } from "./User.router";
import { ClientType as AccountClientType } from "./Account.router";
import { ClientType as SessionClientType } from "./Session.router";

export type BaseConfig = AnyRootConfig;

export type RouterFactory<Config extends BaseConfig> = <
    ProcRouterRecord extends ProcedureRouterRecord
>(
    procedures: ProcRouterRecord
) => CreateRouterInner<Config, ProcRouterRecord>;

export type UnsetMarker = typeof unsetMarker;

export type ProcBuilder<Config extends BaseConfig> = ProcedureBuilder<
    ProcedureParams<Config, any, any, any, UnsetMarker, UnsetMarker, any>
>;

export function db(ctx: any) {
    if (!ctx.prisma) {
        throw new Error('Missing "prisma" field in trpc context');
    }
    return ctx.prisma as PrismaClient;
}

export function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({
        workflow: createWorkflowRouter(router, procedure),
        workflowStep: createWorkflowStepRouter(router, procedure),
        workflowExecution: createWorkflowExecutionRouter(router, procedure),
        integration: createIntegrationRouter(router, procedure),
        apiKey: createApiKeyRouter(router, procedure),
        subscription: createSubscriptionRouter(router, procedure),
        billingData: createBillingDataRouter(router, procedure),
        organization: createOrganizationRouter(router, procedure),
        organizationRole: createOrganizationRoleRouter(router, procedure),
        user: createUserRouter(router, procedure),
        account: createAccountRouter(router, procedure),
        session: createSessionRouter(router, procedure),
    }
    );
}

export interface ClientType<AppRouter extends AnyRouter> {
    workflow: WorkflowClientType<AppRouter>;
    workflowStep: WorkflowStepClientType<AppRouter>;
    workflowExecution: WorkflowExecutionClientType<AppRouter>;
    integration: IntegrationClientType<AppRouter>;
    apiKey: ApiKeyClientType<AppRouter>;
    subscription: SubscriptionClientType<AppRouter>;
    billingData: BillingDataClientType<AppRouter>;
    organization: OrganizationClientType<AppRouter>;
    organizationRole: OrganizationRoleClientType<AppRouter>;
    user: UserClientType<AppRouter>;
    account: AccountClientType<AppRouter>;
    session: SessionClientType<AppRouter>;
}
