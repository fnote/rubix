export class CashAccount {

	SEC_ACC_NUM : string;
	CASH_ACC_NUM : string;
	ACC_TYP : string;
	CURR : string;
	BALANCE : number;
	BLK_AMT : number;
	OD_LMT : number;
	BUY_PWR : number;
	UNREAL_SALES : number;
	CASH_FOR_WITH : number;
	MAR_BLK : number;
	MAR_DUE : number;
	MAX_MAR_AMT : number;
	MAX_DAY_MAR_AMT : number;
	RAPV : number;
	RAPV_DAY : number;
	LIQUID_AMT : number;
	TOP_UP_AMT : number;
	OVR_NT_MAR_BUY_PWR : number;
	INTRA_DAY_MAR_BUY_PWR : number;
	MAR_NOTI_LEVEL : number;
	PEND_MAR_FEE : number;
	MAR_EXP_DATE : number;
	D_MARG_EXP_DT : number;
	MAIN_CALL_LVL : number;
	SELL_OUT_LVL : number;
	AVAIL_MAR : number;
	VALUATION : number;
	NET_SEC_VAL : number;
	DAY_MAR_DUE : number;
	FUT_CSH_BLK : number;
	FUT_BLK : number;
	M_M : number;
	FUT_LQ_NL : number;
	UNREAL_SUM : number;

	constructor(values : Object = {}) {
		Object.assign(this, values);
	}
}
