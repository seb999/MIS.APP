export interface Expense {
    expenseId?:number;
    expenseName?: string;
    activityCode?: string;
    expenseTypeName?: string;
    expenseTypeId?: number;
    startDate?: Date;
    endDate?: Date;
    activityUnitId?:number;
    activityDpId?:number;

    [key: number]: string;
}