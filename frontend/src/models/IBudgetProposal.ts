import { ActivitiesInterface } from "./IActivity";
import { BudgetCategoriesInterface } from "./IBudgetCategory";
import { BudgetTypesInterface } from "./IBudgetType";



export interface BudgetProposalInterface {
  ID: number,
  BudgetPrice: number,
  ActivityID: number,
  Activity: ActivitiesInterface,
  BudgetCategoryID: number,
  BudgetCategory: BudgetCategoriesInterface,
  BudgetTypeID: number,
  BudgetType : BudgetTypesInterface
}