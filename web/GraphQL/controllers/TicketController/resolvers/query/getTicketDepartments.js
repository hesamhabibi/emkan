module.exports = async (parent, args, { models: { TicketModel }, error_res, trans }) => {

    return [
        {
            title: {
                fa: "تماس با ما",
                en: "Contact us",
            },
            number: 1,
        },
        // {
        //     title: {
        //         fa: "بخش فروش",
        //         en: "Sales department",
        //     },
        //     number: 2,
        // },
        // {
        //     title: {
        //         fa: "مدیریت",
        //         en: "Management",
        //     },
        //     number: 3,
        // }
    ];
};