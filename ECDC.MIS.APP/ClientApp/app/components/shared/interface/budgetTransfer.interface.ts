//Seb : put only properties you want to filter
export interface BudgetTransfer {
    petId: number;
    userIdAdded: number; 
    petType: string;
    sourceExpenseIdName: string;
    targetExpenseIdName: string;
    sourceActivityCode: string;
    targetActivityCode: string;
    sourceBudgetLineId: number;
    targetBudgetLineId: number;
   
    //ExpenseList
    [key: number]: string;
}