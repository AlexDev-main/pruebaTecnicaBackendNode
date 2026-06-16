import swaggerJSDoc from "swagger-jsdoc";

const definition = {
  openapi: "3.0.3",
  info: {
    title: "Inventory API",
    version: "1.0.0",
    description: "Documentacion de la API para autenticacion, productos y pedidos.",
  },
  servers: [
    {
      url: "/api",
      description: "Base path de la API",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Endpoints de autenticacion",
    },
    {
      name: "Products",
      description: "Endpoints de productos",
    },
    {
      name: "Orders",
      description: "Endpoints de pedidos",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      RegisterRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "cliente@test.com",
          },
          password: {
            type: "string",
            minLength: 6,
            example: "123456",
          },
        },
      },
      RegisterResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "User registered successfully",
          },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "cliente@test.com",
          },
          password: {
            type: "string",
            example: "123456",
          },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
      CreateProductRequest: {
        type: "object",
        required: ["name", "description", "price", "stock"],
        properties: {
          name: {
            type: "string",
            example: "Mouse Gamer",
          },
          description: {
            type: "string",
            example: "Mouse ergonomico con sensor optico",
          },
          price: {
            type: "number",
            minimum: 0.01,
            example: 49.99,
          },
          stock: {
            type: "integer",
            minimum: 0,
            example: 100,
          },
        },
      },
      Product: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "6850057d239f6cfb90f8f17c",
          },
          name: {
            type: "string",
            example: "Mouse Gamer",
          },
          description: {
            type: "string",
            example: "Mouse ergonomico con sensor optico",
          },
          price: {
            type: "number",
            example: 49.99,
          },
          stock: {
            type: "integer",
            example: 100,
          },
        },
      },
      CreateOrderRequest: {
        type: "object",
        required: ["items"],
        properties: {
          items: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              required: ["productId", "quantity"],
              properties: {
                productId: {
                  type: "string",
                  example: "6850057d239f6cfb90f8f17c",
                },
                quantity: {
                  type: "integer",
                  minimum: 1,
                  example: 2,
                },
              },
            },
          },
        },
      },
      OrderItem: {
        type: "object",
        properties: {
          productId: {
            type: "string",
            example: "6850057d239f6cfb90f8f17c",
          },
          quantity: {
            type: "integer",
            example: 2,
          },
          unitPrice: {
            type: "number",
            example: 49.99,
          },
        },
      },
      Order: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "68500663239f6cfb90f8f184",
          },
          userId: {
            type: "string",
            example: "684ffeb7239f6cfb90f8f145",
          },
          orderDate: {
            type: "string",
            format: "date-time",
            example: "2026-06-16T15:40:00.000Z",
          },
          totalAmount: {
            type: "number",
            example: 99.98,
          },
          products: {
            type: "array",
            items: {
              $ref: "#/components/schemas/OrderItem",
            },
          },
        },
      },
      ValidationError: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Validation error",
          },
          errors: {
            type: "array",
            items: {
              type: "string",
            },
            example: ["\"email\" must be a valid email"],
          },
        },
      },
      MessageError: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
      },
    },
  },
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Registrar un nuevo usuario",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Usuario registrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/RegisterResponse",
                },
              },
            },
          },
          "400": {
            description: "Error de validacion",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationError",
                },
              },
            },
          },
          "409": {
            description: "Usuario ya existe",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Iniciar sesion",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login correcto",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          "400": {
            description: "Error de validacion",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationError",
                },
              },
            },
          },
          "401": {
            description: "Credenciales invalidas",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
        },
      },
    },
    "/products": {
      get: {
        tags: ["Products"],
        summary: "Listar productos",
        description: "Permite filtrar por nombre, precio minimo y precio maximo.",
        parameters: [
          {
            in: "query",
            name: "name",
            schema: {
              type: "string",
            },
            example: "mouse",
            description: "Filtra por nombre del producto.",
          },
          {
            in: "query",
            name: "minPrice",
            schema: {
              type: "number",
            },
            example: 20,
            description: "Filtra por precio minimo.",
          },
          {
            in: "query",
            name: "maxPrice",
            schema: {
              type: "number",
            },
            example: 100,
            description: "Filtra por precio maximo.",
          },
        ],
        responses: {
          "200": {
            description: "Listado de productos",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Product",
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Products"],
        summary: "Crear producto",
        description: "Requiere JWT valido y rol ADMIN.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateProductRequest",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Producto creado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Product",
                },
              },
            },
          },
          "400": {
            description: "Error de validacion",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ValidationError",
                },
              },
            },
          },
          "401": {
            description: "JWT ausente o invalido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
          "403": {
            description: "No autorizado por rol",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
        },
      },
    },
    "/orders": {
      post: {
        tags: ["Orders"],
        summary: "Crear pedido",
        description: "Requiere JWT valido y rol CUSTOMER.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateOrderRequest",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Pedido creado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Order",
                },
              },
            },
          },
          "400": {
            description: "Error de validacion o stock insuficiente",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
          "401": {
            description: "JWT ausente o invalido",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
          "403": {
            description: "No autorizado por rol",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
          "404": {
            description: "Producto no encontrado",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/MessageError",
                },
              },
            },
          },
        },
      },
    },
  },
};

const openApiOptions = {
  definition,
  apis: [],
};

const openApiSpec = swaggerJSDoc(openApiOptions);

export default openApiSpec;
