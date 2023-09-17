import React from 'react';
import { Button, Modal, Form, Input, DatePicker, Select } from 'antd';
import { btn, cardInput } from '../style';

const AddIncome = ({ isIncomeModalVisible, handleIncomeModal, onFinish }) => {

    const [form] = Form.useForm();

    return (
        <Modal
            title="Add Income"
            visible={isIncomeModalVisible}
            onCancel={handleIncomeModal}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={(value) => {
                    onFinish(value, "income");
                    form.resetFields();
                }}
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input the name of the transaction!",
                        },
                    ]}
                >
                    <Input type="text" className={`${cardInput.inputs}`}  />
                </Form.Item>
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            message: "Please input the expense amount!",
                        },
                    ]}
                >
                    <Input type="number" className={`${cardInput.inputs}`} />
                </Form.Item>
                <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                        {
                            required: true,
                            message: "Please select the date!",
                        },
                    ]}
                >
                    <DatePicker format="YYYY-MM-DD" className={`${cardInput.inputs}`}  />
                </Form.Item>
                <Form.Item
                    label="Tag"
                    name="tag"
                    rules={[
                        {
                            required: true,
                            message: "Please choose a tag!"
                        }
                    ]}
                >
                    <Select>
                        <Select.Option value="salary">Salary</Select.Option>
                        <Select.Option value="freelance">Freelance</Select.Option>
                        <Select.Option value="investment">Investment</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button className={`${btn.btnActive}`} type="primary" htmlType="submit">Add Income</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddIncome
