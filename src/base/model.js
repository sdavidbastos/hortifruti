import { Model, DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../config/db.js';

export class BaseModel extends Model {
    static initBaseModel() {
        this.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                    allowNull: false,
                },
                deleted_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
                    defaultValue: null,
                },
            },
            {
                sequelize,
                modelName: this.name,
                hooks: {
                    beforeCreate: (instance) => {
                        instance.id = uuidv4();
                    },
                },
            }
        );
    }
}

BaseModel.initBaseModel();
