export interface LoginProps {
    setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface BreadcrumbProps {
    parent: string;
    parentLink: string;
    current: string;
}

export interface HeadingProps {
    title: string;
    detail: string;
}

export interface UserInfoProps {
    email: string;
    password: string;
}

export interface ProfileProps {
    name: string;
    password: string;
}

export interface LanguageProps {
    name: string;
    value: string;
}

export interface UserProps {
    name: string;
    email: string;
}

export interface UserIdProps extends UserProps {
    _id: string;
    __v: number;
    roleId: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserPropsAfterChange extends UserProps {
    tableData: { id: number };
}
