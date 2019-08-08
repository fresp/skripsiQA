export interface UserData {
    id: string,
    company_id: {
        _id: string,
        name: string,
    },
    salesgroup_id: {
        _id: string
        name: string
    },
    employee_no: string,
    img: string,
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    password: string,
    role: string,
    publish: boolean,
    user_id: string,
    auth_code: string
}