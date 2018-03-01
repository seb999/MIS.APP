export interface Expense {
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