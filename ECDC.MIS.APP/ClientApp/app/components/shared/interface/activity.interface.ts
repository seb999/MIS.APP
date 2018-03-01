//Seb : put only properties you want to filter
export interface Activity {
    activityId: string;
    activityName: string;
    activityCode: string;
    strategyId: number;
    unitId: number;
    dpId: number;
    sectionId: number;
    activityLeaderId: number;
    statusId: number;

    //ExpenseList
    [key: number]: string;
}