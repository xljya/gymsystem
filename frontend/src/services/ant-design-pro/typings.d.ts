declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseCoach_ = {
    code?: number;
    data?: Coach;
    message?: string;
  };

  type BaseResponseCoachVO_ = {
    code?: number;
    data?: CoachVO;
    message?: string;
  };

  type BaseResponseCourse_ = {
    code?: number;
    data?: Course;
    message?: string;
  };

  type BaseResponseCoursePurchase_ = {
    code?: number;
    data?: CoursePurchase;
    message?: string;
  };

  type BaseResponseCoursePurchaseVO_ = {
    code?: number;
    data?: CoursePurchaseVO;
    message?: string;
  };

  type BaseResponseCourseVO_ = {
    code?: number;
    data?: CourseVO;
    message?: string;
  };

  type BaseResponseEquipment_ = {
    code?: number;
    data?: Equipment;
    message?: string;
  };

  type BaseResponseEquipmentVO_ = {
    code?: number;
    data?: EquipmentVO;
    message?: string;
  };

  type BaseResponseGoods_ = {
    code?: number;
    data?: Goods;
    message?: string;
  };

  type BaseResponseGoodsTransactions_ = {
    code?: number;
    data?: GoodsTransactions;
    message?: string;
  };

  type BaseResponseGoodsTransactionsVO_ = {
    code?: number;
    data?: GoodsTransactionsVO;
    message?: string;
  };

  type BaseResponseGoodsVO_ = {
    code?: number;
    data?: GoodsVO;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListCourseScheduleVO_ = {
    code?: number;
    data?: CourseScheduleVO[];
    message?: string;
  };

  type BaseResponseListCourseVO_ = {
    code?: number;
    data?: CourseVO[];
    message?: string;
  };

  type BaseResponseListMembers_ = {
    code?: number;
    data?: Members[];
    message?: string;
  };

  type BaseResponseListString_ = {
    code?: number;
    data?: string[];
    message?: string;
  };

  type BaseResponseLoginMemberVO_ = {
    code?: number;
    data?: LoginMemberVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseMembers_ = {
    code?: number;
    data?: Members;
    message?: string;
  };

  type BaseResponseMemberVO_ = {
    code?: number;
    data?: MemberVO;
    message?: string;
  };

  type BaseResponsePageCoachVO_ = {
    code?: number;
    data?: PageCoachVO_;
    message?: string;
  };

  type BaseResponsePageCourseBookingVO_ = {
    code?: number;
    data?: PageCourseBookingVO_;
    message?: string;
  };

  type BaseResponsePageCourseCategoryVO_ = {
    code?: number;
    data?: PageCourseCategoryVO_;
    message?: string;
  };

  type BaseResponsePageCoursePurchaseVO_ = {
    code?: number;
    data?: PageCoursePurchaseVO_;
    message?: string;
  };

  type BaseResponsePageCourseScheduleVO_ = {
    code?: number;
    data?: PageCourseScheduleVO_;
    message?: string;
  };

  type BaseResponsePageCourseVO_ = {
    code?: number;
    data?: PageCourseVO_;
    message?: string;
  };

  type BaseResponsePageEquipmentVO_ = {
    code?: number;
    data?: PageEquipmentVO_;
    message?: string;
  };

  type BaseResponsePageGoodsTransactionsVO_ = {
    code?: number;
    data?: PageGoodsTransactionsVO_;
    message?: string;
  };

  type BaseResponsePageGoodsVO_ = {
    code?: number;
    data?: PageGoodsVO_;
    message?: string;
  };

  type BaseResponsePageMemberVO_ = {
    code?: number;
    data?: PageMemberVO_;
    message?: string;
  };

  type Coach = {
    coachAccount?: string;
    coachAddress?: string;
    coachAge?: number;
    coachAvatar?: string;
    coachId?: number;
    coachName?: string;
    coachSalary?: string;
    coachStatus?: number;
    courseType?: string;
    createTime?: string;
    entryDate?: string;
    gender?: number;
    isDelete?: number;
    updateTime?: string;
  };

  type CoachAddRequest = {
    coachAccount?: string;
    coachAddress?: string;
    coachAge?: number;
    coachAvatar?: string;
    coachName?: string;
    coachSalary?: string;
    courseType?: string;
    entryDate?: string;
    gender?: number;
  };

  type CoachQueryRequest = {
    coachAccount?: string;
    coachId?: number;
    coachName?: string;
    coachStatus?: number;
    courseType?: string;
    current?: number;
    gender?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type CoachRegisterRequest = {
    coachAccount?: string;
    coachAddress?: string;
    coachAge?: number;
    coachAvatar?: string;
    coachName?: string;
    coachSalary?: string;
    courseType?: string;
    entryDate?: string;
    gender?: number;
  };

  type CoachUpdateRequest = {
    coachAddress?: string;
    coachAge?: number;
    coachAvatar?: string;
    coachId?: number;
    coachName?: string;
    coachSalary?: string;
    coachStatus?: number;
    courseType?: string;
    entryDate?: string;
    gender?: number;
  };

  type CoachVO = {
    coachAccount?: string;
    coachAddress?: string;
    coachAge?: number;
    coachAvatar?: string;
    coachId?: number;
    coachName?: string;
    coachStatus?: number;
    courseType?: string;
    createTime?: string;
    entryDate?: string;
    gender?: number;
    updateTime?: string;
  };

  type Course = {
    categoryId?: number;
    coachId?: number;
    courseId?: number;
    courseName?: string;
    createTime?: string;
    description?: string;
    difficultyLevel?: string;
    duration?: number;
    imageUrl?: string;
    isDelete?: number;
    sellingPrice?: number;
    updateTime?: string;
  };

  type CourseAddRequest = {
    categoryId?: number;
    coachId?: number;
    courseName?: string;
    description?: string;
    difficultyLevel?: string;
    duration?: number;
    imageUrl?: string;
    sellingPrice?: number;
  };

  type CourseBookingAddRequest = {
    attendanceStatus?: number;
    bookingId?: number;
    bookingStatus?: number;
    memberId?: number;
    scheduleId?: number;
  };

  type CourseBookingQueryRequest = {
    attendanceStatus?: number;
    bookingId?: number;
    bookingStatus?: number;
    current?: number;
    memberId?: number;
    pageSize?: number;
    scheduleId?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type CourseBookingUpdateRequest = {
    attendanceStatus?: number;
    bookingId?: number;
    bookingStatus?: number;
    memberId?: number;
    scheduleId?: number;
  };

  type CourseBookingVO = {
    attendanceStatus?: number;
    bookingId?: number;
    bookingStatus?: number;
    createTime?: string;
    memberId?: number;
    scheduleId?: number;
  };

  type CourseCategoryAddRequest = {
    categoryDesc?: string;
    categoryName?: string;
  };

  type CourseCategoryQueryRequest = {
    categoryDesc?: string;
    categoryId?: number;
    categoryName?: string;
    current?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type CourseCategoryUpdateRequest = {
    categoryDesc?: string;
    categoryId?: number;
    categoryName?: string;
  };

  type CourseCategoryVO = {
    categoryDesc?: string;
    categoryId?: number;
    categoryName?: string;
    createTime?: string;
    updateTime?: string;
  };

  type CoursePurchase = {
    classCount?: number;
    coachId?: number;
    courseId?: number;
    createTime?: string;
    id?: number;
    isDelete?: number;
    memberId?: number;
    status?: number;
    totalPrice?: number;
    updateTime?: string;
  };

  type CoursePurchaseAddRequest = {
    classCount?: number;
    coachId?: number;
    courseId?: number;
    memberId?: number;
    totalPrice?: number;
  };

  type CoursePurchaseQueryRequest = {
    courseId?: number;
    current?: number;
    memberId?: number;
    pageSize?: number;
    paymentStatus?: number;
    purchaseId?: number;
    purchaseTimeEnd?: string;
    purchaseTimeStart?: string;
    sortField?: string;
    sortOrder?: string;
    status?: number;
  };

  type CoursePurchaseUpdateRequest = {
    classCount?: number;
    coachId?: number;
    courseId?: number;
    id?: number;
    memberId?: number;
    status?: number;
    totalPrice?: number;
  };

  type CoursePurchaseVO = {
    classCount?: number;
    coachId?: number;
    courseId?: number;
    createTime?: string;
    id?: number;
    memberId?: number;
    status?: number;
    totalPrice?: number;
  };

  type CourseQueryRequest = {
    categoryId?: number;
    coachId?: number;
    courseId?: number;
    courseName?: string;
    current?: number;
    difficultyLevel?: string;
    duration?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type CourseScheduleAddRequest = {
    coachId?: number;
    courseId?: number;
    endTime?: string;
    maxParticipants?: number;
    roomNumber?: string;
    startTime?: string;
  };

  type CourseScheduleQueryRequest = {
    coachId?: number;
    courseId?: number;
    current?: number;
    endTime?: string;
    endTimeBegin?: string;
    endTimeEnd?: string;
    pageSize?: number;
    scheduleId?: number;
    sortField?: string;
    sortOrder?: string;
    startTime?: string;
    startTimeBegin?: string;
    startTimeEnd?: string;
    status?: number;
  };

  type CourseScheduleUpdateRequest = {
    coachId?: number;
    courseId?: number;
    endTime?: string;
    maxParticipants?: number;
    roomNumber?: string;
    scheduleId?: number;
    startTime?: string;
    status?: number;
  };

  type CourseScheduleVO = {
    coachId?: number;
    courseId?: number;
    createTime?: string;
    currentParticipants?: number;
    endTime?: string;
    isDelete?: number;
    maxParticipants?: number;
    roomNumber?: string;
    scheduleId?: number;
    startTime?: string;
    status?: number;
    updateTime?: string;
  };

  type CourseUpdateRequest = {
    categoryId?: number;
    coachId?: number;
    courseId?: number;
    courseName?: string;
    description?: string;
    difficultyLevel?: string;
    duration?: number;
    imageUrl?: string;
    sellingPrice?: number;
  };

  type CourseVO = {
    categoryName?: string;
    coachId?: number;
    coachName?: string;
    courseId?: number;
    courseName?: string;
    createTime?: string;
    description?: string;
    difficultyLevel?: string;
    duration?: number;
    imageUrl?: string;
    schedule?: ScheduleVO[];
    sellingPrice?: number;
  };

  type DeleteRequest = {
    bookingId?: number;
    categoryId?: number;
    coachId?: number;
    courseId?: number;
    eqId?: number;
    goodsId?: number;
    id?: number;
    memberId?: number;
    purchaseId?: number;
    scheduleId?: number;
    transactionId?: number;
  };

  type Equipment = {
    createTime?: string;
    eqId?: number;
    eqName?: string;
    eqText?: string;
    isDelete?: number;
    updateTime?: string;
  };

  type EquipmentAddRequest = {
    eqName?: string;
    eqText?: string;
  };

  type EquipmentQueryRequest = {
    current?: number;
    eqId?: number;
    eqName?: string;
    eqStatus?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type EquipmentUpdateRequest = {
    eqId?: number;
    eqName?: string;
    eqText?: string;
  };

  type EquipmentVO = {
    createTime?: string;
    eqId?: number;
    eqName?: string;
    eqText?: string;
  };

  type getCoachByIdUsingGETParams = {
    /** coachId */
    coachId?: number;
  };

  type getCoachVOByIdUsingGETParams = {
    /** coachId */
    coachId?: number;
  };

  type getCourseByIdUsingGETParams = {
    /** courseId */
    courseId?: number;
  };

  type getCoursePurchaseByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getCoursePurchaseVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getCourseVoByIdWithScheduleUsingGETParams = {
    /** id */
    id: number;
  };

  type getEquipmentByIdUsingGETParams = {
    /** eqId */
    eqId?: number;
  };

  type getEquipmentVOByIdUsingGETParams = {
    /** eqId */
    eqId?: number;
  };

  type getGoodsByIdUsingGETParams = {
    /** goodsId */
    goodsId?: number;
  };

  type getGoodsTransactionsByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getGoodsTransactionsVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getGoodsVOByIdUsingGETParams = {
    /** goodsId */
    goodsId?: number;
  };

  type getMemberByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type getMemberVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type Goods = {
    createTime?: string;
    goodsId?: number;
    goodsName?: string;
    inventory?: number;
    isDelete?: number;
    remark?: string;
    sellPrice?: number;
    unit?: string;
    unitPrice?: number;
    updateTime?: string;
  };

  type GoodsAddRequest = {
    goodsId?: number;
    goodsName?: string;
    inventory?: number;
    remark?: string;
    sellPrice?: number;
    unit?: string;
    unitPrice?: number;
  };

  type GoodsQueryRequest = {
    current?: number;
    goodsId?: number;
    goodsName?: string;
    isDelete?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    unit?: string;
  };

  type GoodsTransactions = {
    count?: number;
    createTime?: string;
    goodsId?: number;
    id?: number;
    isDelete?: number;
    memberId?: number;
    price?: number;
    updateTime?: string;
  };

  type GoodsTransactionsAddRequest = {
    count?: number;
    goodsId?: number;
    memberId?: number;
    price?: number;
  };

  type GoodsTransactionsQueryRequest = {
    countMax?: number;
    countMin?: number;
    createTimeEnd?: string;
    createTimeStart?: string;
    current?: number;
    goodsId?: number;
    id?: number;
    memberId?: number;
    memberName?: string;
    pageSize?: number;
    priceMax?: number;
    priceMin?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type GoodsTransactionsUpdateRequest = {
    count?: number;
    goodsId?: number;
    id?: number;
    memberId?: number;
    price?: number;
  };

  type GoodsTransactionsVO = {
    count?: number;
    createTime?: string;
    goodsId?: number;
    goodsName?: string;
    goodsUnit?: string;
    id?: number;
    memberId?: number;
    memberName?: string;
    price?: number;
    totalAmount?: number;
    updateTime?: string;
  };

  type GoodsUpdateRequest = {
    goodsId?: number;
    goodsName?: string;
    inventory?: number;
    remark?: string;
    sellPrice?: number;
    unit?: string;
    unitPrice?: number;
  };

  type GoodsVO = {
    createTime?: string;
    goodsId?: number;
    goodsName?: string;
    inventory?: number;
    remark?: string;
    sellPrice?: number;
    unit?: string;
  };

  type listCourseByCategoryIdUsingGETParams = {
    /** categoryId */
    categoryId: number;
  };

  type listCourseByCoachIdUsingGETParams = {
    /** coachId */
    coachId: number;
  };

  type listCoursesByCategoryIdWithScheduleUsingGETParams = {
    /** categoryId */
    categoryId?: number;
  };

  type LoginMemberVO = {
    createTime?: string;
    gender?: number;
    id?: number;
    memberAccount?: string;
    memberAvatar?: string;
    memberName?: string;
    memberRole?: string;
    updateTime?: string;
  };

  type MemberAddRequest = {
    gender?: number;
    memberAccount?: string;
    memberAvatar?: string;
    memberName?: string;
    memberRole?: string;
  };

  type MemberLoginRequest = {
    memberAccount?: string;
    memberPassword?: string;
  };

  type MemberQueryRequest = {
    current?: number;
    gender?: number;
    id?: number;
    memberAccount?: string;
    memberAvatar?: string;
    memberName?: string;
    memberRole?: string;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
  };

  type MemberRegisterRequest = {
    checkPassword?: string;
    memberAccount?: string;
    memberPassword?: string;
  };

  type Members = {
    createTime?: string;
    gender?: number;
    id?: number;
    isDelete?: number;
    memberAccount?: string;
    memberAvatar?: string;
    memberName?: string;
    memberPassword?: string;
    memberRole?: string;
    updateTime?: string;
  };

  type MemberUpdateRequest = {
    gender?: number;
    id?: number;
    memberAvatar?: string;
    memberName?: string;
    memberRole?: string;
  };

  type MemberVO = {
    createTime?: string;
    gender?: number;
    id?: number;
    memberAccount?: string;
    memberAvatar?: string;
    memberName?: string;
    memberRole?: string;
  };

  type PageCoachVO_ = {
    current?: number;
    pages?: number;
    records?: CoachVO[];
    size?: number;
    total?: number;
  };

  type PageCourseBookingVO_ = {
    current?: number;
    pages?: number;
    records?: CourseBookingVO[];
    size?: number;
    total?: number;
  };

  type PageCourseCategoryVO_ = {
    current?: number;
    pages?: number;
    records?: CourseCategoryVO[];
    size?: number;
    total?: number;
  };

  type PageCoursePurchaseVO_ = {
    current?: number;
    pages?: number;
    records?: CoursePurchaseVO[];
    size?: number;
    total?: number;
  };

  type PageCourseScheduleVO_ = {
    current?: number;
    pages?: number;
    records?: CourseScheduleVO[];
    size?: number;
    total?: number;
  };

  type PageCourseVO_ = {
    current?: number;
    pages?: number;
    records?: CourseVO[];
    size?: number;
    total?: number;
  };

  type PageEquipmentVO_ = {
    current?: number;
    pages?: number;
    records?: EquipmentVO[];
    size?: number;
    total?: number;
  };

  type PageGoodsTransactionsVO_ = {
    current?: number;
    pages?: number;
    records?: GoodsTransactionsVO[];
    size?: number;
    total?: number;
  };

  type PageGoodsVO_ = {
    current?: number;
    pages?: number;
    records?: GoodsVO[];
    size?: number;
    total?: number;
  };

  type PageMemberVO_ = {
    current?: number;
    pages?: number;
    records?: MemberVO[];
    size?: number;
    total?: number;
  };

  type ScheduleVO = {
    day?: string;
    scheduleId?: number;
    time?: string;
  };
}
