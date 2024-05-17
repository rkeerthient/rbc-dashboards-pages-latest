export interface Tasks {
	name?: string,
	description?: string,
	field?: string,
	shouldScrore?: boolean,
}

export interface C_taskGroups {
	name?: string,
	description?: string,
	tasks?: Tasks[],
}

export interface C_testDashboards {
	name?: string,
	description?: string,
	tasks?: Tasks[],
}

export default interface Ce_site {
	name: string,
	c_dashboardCompletionDescription?: string,
	c_dashboardCompletionLabel?: string,
	c_dashboardHeroDescription?: any,
	c_dashboardPagesURLText?: string,
	c_financialProfessionalVisualConfiguration?: string,
	c_locationVisualConfiguration?: string,
	c_productVisualConfiguration?: string,
	c_taskGroups?: C_taskGroups[],
	c_testDashboards?: C_testDashboards[],
	id: string,
}
