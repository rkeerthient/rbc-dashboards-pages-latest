export enum Category {
	BOOK_TRAVEL = "Book Travel",
	CHECK_IN = "Check in",
	FEES_POLICIES = "Fees Policies - Deprecated",
	FLIGHT_STATUS = "Flight Status",
	TICKETS = "Tickets",
	TICKETING = "Ticketing - Deprecated",
	AMENITIES = "Amenities",
	FRONT_DESK = "Front Desk - Deprecated",
	PARKING = "Parking",
	GIFT_CARD = "Gift Card",
	WAITLIST = "Waitlist",
	DELIVERY = "Delivery (Restaurant)",
	ORDER = "Order (Restaurant)",
	TAKEOUT = "Takeout - Deprecated",
	PICKUP = "Pickup (Restaurant)",
	RESERVE = "Reserve (Restaurant)",
	MENU = "Menu",
	APPOINTMENT = "Appointment - Deprecated",
	PORTFOLIO = "Portfolio - Deprecated",
	QUOTE = "Quote",
	SERVICES = "Services",
	STORE_ORDERS = "Store Orders - Deprecated",
	STORE_SHOP = "Store Shop - Deprecated",
	STORE_SUPPORT = "Store Support - Deprecated",
	SCHEDULE = "Schedule",
	SHOWTIMES = "Showtimes",
	AVAILABILITY = "Availability",
	PRICING = "Pricing",
	ACTIVITIES = "Activities",
	BOOK = "Book",
	BOOK__HOTEL_ = "Book (Hotel)",
	BOOK__RIDE_ = "Book Ride",
	BOOK__TOUR_ = "Book Tour",
	CAREERS = "Careers",
	CHARGE = "Charge",
	COUPONS = "Coupons",
	DELIVERY__RETAIL_ = "Delivery (Retail)",
	DONATE = "Donate",
	EVENTS = "Events",
	ORDER__RETAIL_ = "Order (Retail)",
	OTHER_MENU = "Other Menu - Deprecated",
	PICKUP__RETAIL_ = "Pickup (Retail)",
	RESERVE__PARKING_ = "Reserve (Parking)",
	SHOWS = "Shows",
	SPORTS = "Sports",
	SUPPORT = "Support",
	TEE_TIME = "Tee Time",
	GIFT_CARD__RESTAURANT_ = "Gift Card (Restaurant) - Deprecated",
}

export interface AppleActionLinks {
	category: Category,
	appStoreUrl: string,
	quickLinkUrl: string,
	appName: string,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export enum BingRelationshipType {
	LOCATED_IN = "Located In",
	DEPARTMENT_OF = "Department Of",
	WORKS_AT = "Works At",
}

export interface Interval {
	start: any,
	end: any,
}

export interface DayHour {
	openIntervals?: Interval[],
	isClosed?: boolean,
}

export interface HolidayHours {
	date: string,
	openIntervals?: Interval[],
	isClosed?: boolean,
	isRegularHours?: boolean,
}

export interface Hours {
	monday?: DayHour,
	tuesday?: DayHour,
	wednesday?: DayHour,
	thursday?: DayHour,
	friday?: DayHour,
	saturday?: DayHour,
	sunday?: DayHour,
	holidayHours?: HolidayHours[],
	reopenDate?: string,
}

export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export interface C_advisorBio {
	headshot?: ComplexImage,
	name?: string,
	role?: string,
	email?: string,
	bio?: string,
}

export enum YearsReceived {
	_2030 = "2030",
	_2029 = "2029",
	_2028 = "2028",
	_2027 = "2027",
	_2026 = "2026",
	_2025 = "2025",
	_2024 = "2024",
	_2023 = "2023",
	_2022 = "2022",
	_2021 = "2021",
	_2020 = "2020",
	_2019 = "2019",
	_2018 = "2018",
	_2017 = "2017",
	_2016 = "2016",
	_2015 = "2015",
	_2014 = "2014",
	_2013 = "2013",
	_2012 = "2012",
	_2011 = "2011",
	_2010 = "2010",
	_2009 = "2009",
	_2008 = "2008",
	_2007 = "2007",
	_2006 = "2006",
	_2005 = "2005",
}

export interface C_awards {
	nameOfAwardOrHonor?: string,
	yearsReceived?: YearsReceived[],
}

export enum C_clientFocuses {
	FINANCIAL_PLANNING = "College Education Planning",
	PERSONAL_RETIREMENT = "Corporate Benefits",
	SAVING_FOR_EDUCATION = "Corporate Executive Services",
	ESG_INVESTING = "Corporate Retirement Plan Services",
	PHILANTHROPHY___CHARITABLE_GIVING = "Divorce Transition Planning",
	INVESTING_ADVICE = "Education Planning",
	EMPLOYEE_BENEFITS_PLANNING = "Employee Benefits Planning",
	EXECUTIVE_COMPENSATION = "Executive Compensation",
	EQUITY_COMPENSATION_SERVICES = "Equity Compensation Services",
	FAMILY_WEALTH_MANAGEMENT_STRATEGIES = "Family Wealth Management Strategies",
	INSTITUTIONAL_AND_CORPORATE_BENEFIT_SERVICES = "Institutional and Corporate Benefit Services",
	INSTITUTIONAL_CONSULTING = "Institutional Consulting",
	INSTITUTIONAL_INVESTMENT_CONSULTING = "Institutional Investment Consulting",
	SERVICES_FOR_ENDOWMENTS__FOUNDATIONS__AND_NON_PROFITS = "Services for Endowments, Foundations, and Non-profits",
	SERVICES_FOR_DEFINED_BENEFIT_PLANS = "Services for Defined Benefit Plans",
	INVESTMENT_CONSULTING_FOR_DEFINED_CONTRIBUTION_PLANS = "Investment Consulting for Defined Contribution Plans",
	EMPLOYEE_FINANCIAL_HEALTH = "Employee Financial Health",
	INTERNATIONAL_WEALTH_MANAGEMENT = "International Wealth Management",
	LEGACY_PLANNING = "Legacy Planning",
	LGBT_WEALTH_PLANNING = "LGBT Wealth Planning",
	LIQUIDITY_MANAGEMENT = "Liquidity Management",
	MANAGING_NEW_WEALTH = "Managing New Wealth",
	PERSONAL_RETIREMENT_PLANNING = "Personal Retirement Planning",
	PHILANTHROPIC_PLANNING = "Philanthropic Planning",
	PORTFOLIO_MANAGEMENT_SERVICES = "Portfolio Management Services",
	SMALL_BUSINESS_STRATEGIES = "Small Business Strategies",
	SOCIALLY_RESPONSIBLE__VALUES_BASED__AND_ESG_INVESTING_ = "Socially Responsible, Values Based, and ESG Investing*",
	SPECIAL_NEEDS_PLANNING_STRATEGIES = "Special Needs Planning Strategies",
	WOMEN_AND_WEALTH = "Women and Wealth",
	SPORTS___ENTERTAINMENT = "Sports & Entertainment",
	INDIVIDUAL_AND_CORPORATE_INVESTMENT_STRATEGY = "Individual and Corporate Investment Strategy",
	TAX_MINIMIZATION = "Tax Minimization",
	RETIREMENT_INCOME = "Retirement Income",
}

export interface C_contentGrid {
	title: string,
	financialProfessionals?: EntityReference[],
}

export interface C_designations {
	abbreviation?: string,
	date?: string,
	name?: string,
}

export interface C_education {
	school?: string,
	startDate?: string,
	endDate?: string,
	degree?: string,
}

export interface C_events {
	title?: string,
	events?: EntityReference[],
}

export interface C_hero {
	title?: string,
	image?: ComplexImage,
	email?: string,
	phoneNumber?: string,
	address?: Address,
	phoneNumber2?: string,
	emails?: string[],
	subtitle?: string,
}

export enum C_hobbiesAndInterests {
	ADVENTURE_SPORTS = "Adventure sports",
	ANTIQUING = "Antiquing",
	BADMINTON = "Badminton",
	BASEBALL = "Baseball",
	BASKETBALL = "Basketball",
	BIKING = "Biking",
	BILLIARDS = "Billiards",
	BOATING = "Boating",
	BOWLING = "Bowling",
	BOXING = "Boxing",
	BUNGEE_JUMPING = "Bungee jumping",
	CAMPING = "Camping",
	CHESS = "Chess",
	COOKING = "Cooking",
	DANCING = "Dancing",
	DRAWING_SKETCHING = "Drawing/sketching",
	FISHING = "Fishing",
	FOOTBALL = "Football",
	GARDENING = "Gardening",
	GENEALOGY = "Genealogy",
	GOLFING = "Golfing",
	GYMNASTICS = "Gymnastics",
	HIKING = "Hiking",
	HORSEBACK_RIDING = "Horseback riding",
	HUNTING = "Hunting",
	ICE_HOCKEY = "Ice hockey",
	ICE_SKATING = "Ice skating",
	INTERIOR_DECORATING = "Interior decorating",
	KNITTING_CROCHETING = "Knitting/crocheting",
	MUSIC = "Music",
	PAINTING = "Painting",
	PHOTOGRAPHY = "Photography",
	PICKLEBALL = "Pickleball",
	POTTERY = "Pottery",
	RACQUETBALL = "Racquetball",
	READING = "Reading",
	REFEREEING = "Refereeing",
	ROCK_CLIMBING = "Rock climbing",
	RUNNING = "Running",
	RUNNING_MARATHONS = "Running marathons",
	SCRAPBOOKING = "Scrapbooking",
	SCUBA_DIVING = "Scuba diving",
	SEWING = "Sewing",
	SINGING = "Singing",
	SKIING = "Skiing",
	SKYDIVING = "Skydiving",
	SOCCER = "Soccer",
	SOFTBALL = "Softball",
	SPENDING_TIME_WITH_MY_FAMILY = "Spending time with my family",
	SURFING = "Surfing",
	SWIMMING = "Swimming",
	TABLE_TENNIS = "Table tennis",
	TENNIS = "Tennis",
	TRAVELING = "Traveling",
	VOLLEYBALL = "Volleyball",
	WATCHING_MOVIES = "Watching movies",
	WOOD_WORKING = "Wood working",
	WRITING = "Writing",
	YOGA = "Yoga",
}

export interface C_insights {
	blogs?: EntityReference[],
}

export interface Coordinates {
	latitude?: string,
	longitude?: string,
}

export interface C_locator {
	description?: string,
	phoneNumber?: string,
	email?: string,
	coordinates?: Coordinates,
}

export enum C_profileType {
	FINANCIAL_ADVISOR = "Financial Advisor",
	TEAM = "Team",
	BRANCH = "Branch",
	COMPLEX = "Complex",
}

export enum C_serviceAreas {
	AL = "Alabama",
	AK = "Alaska",
	AZ = "Arizona",
	AR = "Arkansas",
	CA = "California",
	CO = "Colorado",
	CT = "Connecticut",
	DE = "Delaware",
	FL = "Florida",
	GA = "Georgia",
	HI = "Hawaii",
	ID = "Idaho",
	IL = "Illinois",
	IN = "Indiana",
	IA = "Iowa",
	KS = "Kansas",
	KY = "Kentucky",
	LA = "Louisiana",
	ME = "Maine",
	MD = "Maryland",
	MA = "Massachusetts",
	MI = "Michigan",
	MN = "Minnesota",
	MS = "Mississippi",
	MO = "Missouri",
	MT = "Montana",
	NE = "Nebraska",
	NV = "Nevada",
	NH = "New Hampshire",
	NJ = "New Jersey",
	NM = "New Mexico",
	NY = "New York",
	NC = "North Carolina",
	ND = "North Dakota",
	OH = "Ohio",
	OK = "Oklahoma",
	OR = "Oregon",
	PA = "Pennsylvania",
	RI = "Rhode Island",
	SC = "South Carolina",
	SD = "South Dakota",
	TN = "Tennessee",
	TX = "Texas",
	UT = "Utah",
	VT = "Vermont",
	VA = "Virginia",
	WA = "Washington",
	WV = "West Virginia",
	WI = "Wisconsin",
	WY = "Wyoming",
}

export interface C_servicesOffered {
	sectionTitle?: string,
	servicesOptions?: EntityReference[],
}

export enum C_template {
}

export interface C_visualConfigurations {
	template?: string,
	data?: string,
}

export interface Bios {
	label?: string,
	ids?: string[],
}

export interface ProductLists {
	label?: string,
	ids?: string[],
}

export interface FeaturedMessage {
	description?: string,
	url?: string,
}

export interface MenuUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface OrderUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export enum PaymentOptions {
	AFTERPAY = "Afterpay",
	ALIPAY = "Alipay",
	AMERICANEXPRESS = "American Express",
	ANDROIDPAY = "Google Pay",
	APPLEPAY = "Apple Pay",
	ATM = "ATM",
	ATMQUICK = "ATM Quick",
	BACS = "BACS",
	BANCONTACT = "Bancontact",
	BANKDEPOSIT = "Bank Deposit",
	BANKPAY = "Bank Pay",
	BGO = "Bank/Giro Overschrijving",
	BITCOIN = "Bitcoin",
	Bar = "Bargeld",
	CARTASI = "CartaSi",
	CASH = "Cash",
	CCS = "CCS",
	CHECK = "Check",
	CONB = "Contactloos betalen",
	CONTACTLESSPAYME = "Contactless Payment",
	CVVV = "Cadeaubon/VVV bon",
	DEBITNOTE = "Debit Note",
	DINERSCLUB = "Diners Club",
	DIRECTDEBIT = "Direct Debit",
	DISCOVER = "Discover",
	ECKARTE = "Girokarte",
	ECOCHEQUE = "EcoCheque",
	EKENA = "E-kena",
	EMV = "Elektronische Maaltijdcheques",
	FINANCING = "Financing",
	GOPAY = "GoPay",
	HAYAKAKEN = "Hayakaken",
	HEBAG = "He-Bag",
	IBOD = "iBOD",
	ICCARDS = "IC Cards",
	ICOCA = "Icoca",
	ID = "iD",
	IDEAL = "iDeal",
	INCA = "Incasso",
	INVOICE = "Invoice",
	JCB = "JCB",
	JCoinPay = "J−Coin Pay",
	JKOPAY = "JKO Pay",
	KITACA = "Kitaca",
	KLA = "Klantenkaart",
	KLARNA = "Klarna",
	LINEPAY = "LINE Pay",
	MAESTRO = "Maestro",
	MANACA = "Manaca",
	MASTERCARD = "MasterCard",
	MIPAY = "Mi Pay",
	MONIZZE = "Monizze",
	MPAY = "MPay",
	Manuelle_Lastsch = "Manuelle Lastschrift",
	Merpay = "メルPay",
	NANACO = "nanaco",
	NEXI = "Nexi",
	NIMOCA = "Nimoca",
	OREM = "Onder Rembours",
	PASMO = "Pasmo",
	PAYBACKPAY = "Payback Pay",
	PAYBOX = "Paybox",
	PAYCONIQ = "Payconiq",
	PAYPAL = "PayPal",
	PAYPAY = "PayPay",
	PAYSEC = "PaySec",
	PIN = "PIN",
	POSTEPAY = "Postepay",
	QRCODE = "QR Code Payment",
	QUICPAY = "QUICPay",
	RAKUTENEDY = "Rakuten Edy",
	RAKUTENPAY = "楽天Pay",
	SAMSUNGPAY = "Samsung Pay",
	SODEXO = "Sodexo",
	SUGOCA = "Sugoca",
	SUICA = "Suica",
	SWISH = "Swish",
	TICKETRESTAURANT = "Ticket Restaurant",
	TOICA = "Toica",
	TRAVELERSCHECK = "Traveler's Check",
	TSCUBIC = "TS CUBIC",
	TWINT = "Twint",
	UNIONPAY = "China UnionPay",
	VEV = "Via een verzekering",
	VISA = "Visa",
	VISAELECTRON = "Visa Electron",
	VOB = "Vooruit betalen",
	VOUCHER = "Voucher",
	VPAY = "V PAY",
	WAON = "WAON",
	WECHATPAY = "WeChat Pay",
	WIRETRANSFER = "Wire Transfer",
	Yucho_Pay = "ゆうちょPay",
	ZELLE = "Zelle",
	AuPay = "auPay",
	DBarai = "d払い ",
	Überweisung = "Banküberweisung",
}

export interface ReservationUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface WebsiteUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export interface ComplexVideo {
	url: string,
	video?: string,
	description?: string,
}

export default interface FinancialProfessional {
	appleActionLinks?: AppleActionLinks[],
	appleBusinessDescription?: string,
	appleBusinessId?: string,
	appleBusinessIdDqe?: string,
	appleCompanyId?: string,
	appleCompanyIdDqe?: string,
	appleCoverPhoto?: Image,
	appointmentOnly?: boolean,
	awards?: string[],
	bingParentLocation?: EntityReference,
	bingRelationshipType?: BingRelationshipType,
	bingWebsiteOverride?: string,
	disclosureLink?: string,
	facebookWebsiteOverride?: string,
	geomodifier?: string,
	hobbies?: string[],
	holidayHoursConversationEnabled?: boolean,
	interests?: string[],
	landingPageUrl?: string,
	linkedInUrl?: string,
	neighborhood?: string,
	nmlsNumber?: string,
	nudgeEnabled?: boolean,
	onlineServiceHours?: Hours,
	pinterestUrl?: string,
	primaryConversationContact?: any,
	reviewResponseConversationEnabled?: boolean,
	slug?: string,
	teamName?: string,
	tikTokUrl?: string,
	what3WordsAddress?: string,
	yearsOfExperience?: number,
	yelpWebsiteOverride?: string,
	youTubeChannelUrl?: string,
	additionalHoursText?: string,
	address: Address,
	addressHidden?: boolean,
	alternatePhone?: any,
	androidAppUrl?: string,
	associations?: string[],
	brands?: string[],
	description?: string,
	hours?: Hours,
	logo?: ComplexImage,
	name: string,
	categories?: any,
	certifications?: string[],
	cityCoordinate?: Coordinate,
	closed?: boolean,
	c_advisorBio?: C_advisorBio,
	c_awards?: C_awards[],
	c_clientFocuses?: C_clientFocuses[],
	c_contentGrid?: C_contentGrid,
	c_designations?: C_designations[],
	c_education?: C_education[],
	c_events?: C_events,
	c_hero?: C_hero,
	c_hobbiesAndInterests?: C_hobbiesAndInterests[],
	c_insights?: C_insights,
	c_live?: boolean,
	c_locator?: C_locator,
	c_organizations?: string[],
	c_pages_layouts?: EntityReference[],
	c_preferredName?: string,
	c_profileType?: C_profileType,
	c_relatedBlog?: EntityReference[],
	c_role?: string,
	c_serviceAreas?: C_serviceAreas[],
	c_servicesOffered?: C_servicesOffered,
	c_template?: C_template,
	c_visualConfigurations?: C_visualConfigurations[],
	c_volunteeringDisplay?: string[],
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	bios?: Bios,
	productLists?: ProductLists,
	emails?: string[],
	facebookPageUrl?: string,
	fax?: any,
	featuredMessage?: FeaturedMessage,
	photoGallery?: ComplexImage[],
	geocodedCoordinate?: Coordinate,
	googleWebsiteOverride?: string,
	headshot?: Image,
	instagramHandle?: string,
	iosAppUrl?: string,
	isoRegionCode?: string,
	keywords?: string[],
	languages?: string[],
	localPhone?: any,
	mainPhone?: any,
	menuUrl?: MenuUrl,
	mobilePhone?: any,
	orderUrl?: OrderUrl,
	paymentOptions?: PaymentOptions[],
	pickupCoordinate?: Coordinate,
	products?: string[],
	reservationUrl?: ReservationUrl,
	routableCoordinate?: Coordinate,
	services?: string[],
	specialities?: string[],
	id: string,
	timezone?: any,
	tollFreePhone?: any,
	ttyPhone?: any,
	twitterHandle?: string,
	walkableCoordinate?: Coordinate,
	websiteUrl?: WebsiteUrl,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
	videos?: ComplexVideo[],
}
