export interface Expense {
    expenseId?:number;
    expenseName?: string;
    activityCode?: string;
    expenseTypeName?: string;
    expenseTypeId?: number;
    startDate?: Date;
    endDate?: Date;
    unitId?:number;
    dpId?:number;

    [key: number]: string;
}