export interface MergeFormOptionsInterface {
  uuid: string;
  selected: {
    project: {
      id: number;
    };
    category: {
      id: number;
    };
    tags: number[];
    handlerType: {
      id: string | null;
    };
    handler: {
      id: number | null;
    };
    serviceTarget: {
      id: number;
      code: string;
      name: string;
      city: string;
      dist?: string;
    };
    projectFunction: {
      id: number;
      name: string;
      projectId: number;
      code: string;
    };
    fields: {
      priority: {
        id: number;
      };
      reproducibility: {
        id: number;
      };
      severity: {
        id: number;
      };
      status: {
        id: number;
      };
      subStatus: {
        id: number;
      };
    };
  };
  project: {
    id: number;
    code: string;
    name: string;
    enabled: boolean;
    isPublic: boolean;
    handlerRoleId: number;
    platform: string;
    product: string;
    service: string;
    order: number;
    serviceTargetType: {
      id: number;
      name: string;
      label: string;
    };
  }[];
  tags: {
    list: {
      id: number;
      name: string;
      description: string;
      count: number;
      groupId: number;
      group: {
        id: number;
        code: string;
        name: string;
      };
    }[];
  } | null;
  groups: ({
    id: number;
    code: string;
    name: string;
    count: number;
    lists: number[];
  } | null)[];
  categories: {
    id: number;
    name: string;
  }[];
  reporter: {
    id: number;
    name: string;
    email: string;
    employee: {
      id: string;
      name: string;
      department: string;
    };
  };
  handlerType: ({
    id: string;
    name: string;
    label: string;
  } | null)[];
  handler: {
    type: string;
    data: {
      id: number;
      code: string;
      name: string;
    }[];
  } | null;
  serviceTarget: {
    type: string;
    pagination: {
      total: number;
      limit: number;
      size: number;
      page: number;
      start: number;
      next: number;
      search: any;
    };
    data: {
      id: number;
      code: string;
      name: string;
      city: string;
      dist: string;
    }[];
  } | null;
  projectFunctions: ({
    id: number;
    name: string;
    projectId: number;
    code: string;
  } | null)[];
  fields: {
    priority: {
      id: number;
      name: string;
      label: string;
    }[];
    reproducibility: {
      id: number;
      name: string;
      label: string;
    }[];
    severity: {
      id: number;
      name: string;
      label: string;
    }[];
    status: {
      id: number;
      name: string;
      label: string;
    }[];
    subStatus: {
      id: number;
      name: string;
      label: string;
    }[];
  };
}
