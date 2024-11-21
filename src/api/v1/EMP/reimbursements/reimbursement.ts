export interface ReimbursementRequest {
    EmpID: string;
    courseID: string;
    DateReim: string;
    MoneyAmount: number;
}

export interface UpdateRequest {
    requestId: string;
    status: "Approved" | "Rejected";
    approvedBy: string;
}