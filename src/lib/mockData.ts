import { OrgChartNode } from "@/types";

export const MOCK_CHART: Record<number, OrgChartNode> = {
  18: {
    employee: {
      id: 18,
      first_name: "Sarah",
      last_name: "Johnson",
      position: "Chief Executive Officer",
      department: "Executive",
      email: "sarah.johnson@company.com",
      status: "ACTIVE",
    },
    children: [
      {
        employee: {
          id: 21,
          first_name: "Michael",
          last_name: "Chen",
          position: "VP of Engineering",
          department: "Engineering",
          email: "michael.chen@company.com",
          status: "ACTIVE",
        },
        children: [
          {
            employee: {
              id: 25,
              first_name: "Emily",
              last_name: "Rodriguez",
              position: "Senior Engineer",
              department: "Engineering",
              email: "emily.r@company.com",
              status: "ACTIVE",
            },
            children: [],
          },
          {
            employee: {
              id: 29,
              first_name: "David",
              last_name: "Kim",
              position: "Frontend Engineer",
              department: "Engineering",
              email: "david.kim@company.com",
              status: "ACTIVE",
            },
            children: [],
          },
        ],
      },
      {
        employee: {
          id: 22,
          first_name: "Lisa",
          last_name: "Thompson",
          position: "VP of Product",
          department: "Product",
          email: "lisa.t@company.com",
          status: "ACTIVE",
        },
        children: [
          {
            employee: {
              id: 30,
              first_name: "James",
              last_name: "Wilson",
              position: "Product Manager",
              department: "Product",
              email: "james.w@company.com",
              status: "ACTIVE",
            },
            children: [],
          },
        ],
      },
      {
        employee: {
          id: 23,
          first_name: "Robert",
          last_name: "Davis",
          position: "VP of Sales",
          department: "Sales",
          email: "robert.d@company.com",
          status: "ACTIVE",
        },
        children: [],
      },
    ],
  },
  21: {
    employee: {
      id: 21,
      first_name: "Michael",
      last_name: "Chen",
      position: "VP of Engineering",
      department: "Engineering",
      email: "michael.chen@company.com",
      status: "ACTIVE",
    },
    manager: {
      id: 18,
      first_name: "Sarah",
      last_name: "Johnson",
      position: "Chief Executive Officer",
    },
    children: [
      {
        employee: {
          id: 25,
          first_name: "Emily",
          last_name: "Rodriguez",
          position: "Senior Engineer",
          department: "Engineering",
          email: "emily.r@company.com",
          status: "ACTIVE",
        },
        children: [],
      },
      {
        employee: {
          id: 29,
          first_name: "David",
          last_name: "Kim",
          position: "Frontend Engineer",
          department: "Engineering",
          email: "david.kim@company.com",
          status: "ACTIVE",
        },
        children: [],
      },
    ],
  },
  22: {
    employee: {
      id: 22,
      first_name: "Lisa",
      last_name: "Thompson",
      position: "VP of Product",
      department: "Product",
      email: "lisa.t@company.com",
      status: "ACTIVE",
    },
    children: [
      {
        employee: {
          id: 30,
          first_name: "James",
          last_name: "Wilson",
          position: "Product Manager",
          department: "Product",
          status: "ACTIVE",
        },
        children: [],
      },
    ],
  },
  23: {
    employee: {
      id: 23,
      first_name: "Robert",
      last_name: "Davis",
      position: "VP of Sales",
      department: "Sales",
      email: "robert.d@company.com",
      status: "ACTIVE",
    },
    children: [],
  },
  25: {
    employee: {
      id: 25,
      first_name: "Emily",
      last_name: "Rodriguez",
      position: "Senior Engineer",
      department: "Engineering",
      email: "emily.r@company.com",
      status: "ACTIVE",
    },
    children: [],
  },
  29: {
    employee: {
      id: 29,
      first_name: "David",
      last_name: "Kim",
      position: "Frontend Engineer",
      department: "Engineering",
      email: "david.kim@company.com",
      status: "ACTIVE",
    },
    children: [],
  },
  30: {
    employee: {
      id: 30,
      first_name: "James",
      last_name: "Wilson",
      position: "Product Manager",
      department: "Product",
      email: "james.w@company.com",
      status: "ACTIVE",
    },
    children: [],
  },
};
