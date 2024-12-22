
// marketplaceProductPostEveryUserDB
const marketplaceProductPostEveryUserDB = async (data: any) => {
    try {
        const { post } = data;
        console.log(post);
        return {
        message: "Successfully Get Data",
        status: 200,
        };
    } catch (error) {
        console.error(error);
        return { error: "Internal Server Error" };
    }
};

// marketplaceProductGetEveryUserDB
const marketplaceProductGetEveryUserDB = async (data: any) => {
    try {
        const { post } = data;
        console.log(post);
        return {
        message: "Successfully Get Data",
        status: 200,
        };
    } catch (error) {
        console.error(error);
        return { error: "Internal Server Error" };
    }
};


// marketplace product comment update

const marketplaceProductCommentUpdateDB = async (data: any) => {
    try {
        const { post } = data;
        console.log(post);
        return {
        message: "Successfully Get Data",
        status: 200,
        };
    } catch (error) {
        console.error(error);
        return { error: "Internal Server Error" };
    }
}

// marketplaceProductLikeUpdateDB
const marketplaceProductLikeUpdateDB = async (data: any) => {
    try {
        const { post } = data;
        console.log(post);
        return {
        message: "Successfully Get Data",
        status: 200,
        };
    } catch (error) {
        console.error(error);
        return { error: "Internal Server Error" };
    }
};



export const marketplaceServiceDB =  {marketplaceProductPostEveryUserDB,marketplaceProductGetEveryUserDB,marketplaceProductLikeUpdateDB,marketplaceProductCommentUpdateDB};