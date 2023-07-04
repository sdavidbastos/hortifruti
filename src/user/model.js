import { DataTypes } from 'sequelize';
import { compare } from "bcrypt"
import { sequelize } from '../config/db.js';
import { BaseModel } from "../base/model.js"

export class User extends BaseModel {

    verifyPassword(pass) {
        return compare(pass, this.password)
    }

    static initUserModel() {
        this.init(
            {
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                    validate: {
                        isEmail: true,
                    },
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'User',
                hooks: {
                    beforeSave: async function (instance) {
                        if (instance.password) {
                            instance.password = await bcrypt.hash(instance.password, 10)
                        }
                    }
                }
            }
        );
    }
}

User.initUserModel();
