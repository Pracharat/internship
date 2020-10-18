export interface Reimbursetoice{
  employee?: Employee;
  receiptNo?: string;
  receiptAmount?: number;
  receiptDate?: string;
  amountWithdrawn?: number;
  receiptFile?: File;
  remark?: string;
  _id?: any;
}


export interface Employee {
  requestId: any;
  firstname?: string;
  lastname?: string;
  _id?: any;
}
