export interface Expense {
    expenseId?: number;
    sectionId?: number;
    budgetLineId?: number;
    expenseIdName:string;
    expenseName?: string;
    activityCode?: string;
    expenseTypeName?: string;
    expenseTypeId?: number;
    startDate?: Date;
    endDate?: Date;
    unitId?:number;
    dpId?: number;
    projectManagerId?: number;
    authOfficerId?: number;
    procOfficerId?: number;
    procTypeId?: number;
    procStatusId?: number;

    [key: number]: string;
}