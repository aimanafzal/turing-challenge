module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define(
        'Review',
        {
            review_id: {
                type: DataTypes.INTEGER(100),
                primaryKey: true,
                autoIncrement: true,
            },
            customer_id: {
                type: DataTypes.INTEGER(100),
                allowNull: true,
                validate: {
                    notEmpty: true,
                },
            },
            product_id: {
                type: DataTypes.INTEGER(100),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            review: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            rating: {
                type: DataTypes.INTEGER(100),
                allowNull: false,
                defaultValue: 0.0,
            },

            created_on: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue:DataTypes.NOW
            },
        },
        {
            timestamps: false,
            tableName: 'review',
        }
    );

    // Review.associate = ({ Product }) => {
    //     Review.belongsToMany(Product, {
    //         through: 'ProductCategory',
    //         foreignKey: 'product_id',
    //     });

        //   Product.belongsToMany(AttributeValue, {
        //     through: 'ProductAttribute',
        //     as: 'attributes',
        //     foreignKey: 'product_id',
        //   });
    // };

    return Review;
};
