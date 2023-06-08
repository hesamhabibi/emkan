const { sort_query } = require("@common/helpers/SortHelper");

module.exports = async (parent, args, { models: { CareerFormModel }, helpers: { FilterHelper: { filter_query } } }) => {
    const query = await filter_query(args.filter);
    const sort = sort_query(args.sort, { field: "createdAt", type: -1 });
    const career_forms = await CareerFormModel.paginate(query, { page: args.page || 1, limit: args.limit || parseInt(process.env.DEFAULT_PER_PAGE, 10), sort });
    return {
        paginate: {
            total: career_forms.totalDocs,
            page: career_forms.page,
            pages: career_forms.totalPages,
            limit: career_forms.limit,
        },
        data: career_forms.docs
    };
    // return {
    //     paginate: {
    //         total: 2,
    //         page: 1,
    //         pages: 1,
    //         limit: 15,
    //     },
    //     data: [
    //         {
    //             id: "1234",
    //             title: {fa:"title",en:"title"},
    //             name: "name",
    //             user_name: "majid",
    //             user_last_name: "shishegar",
    //             user_email: "majidshishegar0@gmail.com",
    //             user_mobile: "09174835099",
    //             fields: [
    //                 {
    //                     name: "type_text_example",
    //                     title: "نوع تکست",
    //                     type: 1,
    //                     size: 6,
    //                     value: "value1",
    //                 },
    //                 {
    //                     name: "type_big_text",
    //                     title: "متن بلند",
    //                     type: 2,
    //                     size: 6,
    //                     value: "لورم ایپسوم ".repeat(100),
    //                 },
    //                 {
    //                     name: "select",
    //                     title: "انتخابی",
    //                     type: 3,
    //                     size: 6,
    //                     value: "شیراز",
    //                 },
    //                 {
    //                     name: "date",
    //                     title: "تاریخ",
    //                     type: 4,
    //                     size: 6,
    //                     value: "1638291988900",
    //                 },
    //                 {
    //                     name: "image",
    //                     title: "تصویر",
    //                     type: 5,
    //                     size: 6,
    //                     value: {
    //                         media_id: "1234",
    //                         alt: "alt text",
    //                         url: "https://ps.w.org/metronet-profile-picture/assets/icon-256x256.png?rev=2464419"
    //                     },
    //                 },
    //                 {
    //                     name: "file",
    //                     title: "رزومه",
    //                     type: 6,
    //                     size: 6,
    //                     value: {
    //                         media_id: "1234",
    //                         url: "https://ps.w.org/metronet-profile-picture/assets/icon-256x256.png?rev=2464419"
    //                     },
    //                 },
    //             ],
    //             user_id: null,
    //         },
    //         {
    //             id: "12345",
    //             title: {fa:"title2",en:"title2"},
    //             name: "name2",
    //             user_name: "majid2",
    //             user_last_name: "shishegar2",
    //             user_email: "majidshishegar0@gmail.com2",
    //             user_mobile: "091748350992",
    //             fields: [
    //                 {
    //                     name: "other12",
    //                     title: "other12",
    //                     type: 1,
    //                     size: 6,
    //                     value: "value12",
    //                 },
    //                 {
    //                     name: "other22",
    //                     title: "other22",
    //                     type: 1,
    //                     size: 6,
    //                     value: "value22",
    //                 }
    //             ],
    //             user_id: null,
    //         }
    //     ]
    // };
};