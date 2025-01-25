import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1) VPC
    const vpc = new ec2.Vpc(this, 'MyVpc', {
      maxAzs: 2, // how many AZs to use
      natGateways: 1,
    });

    // 2) RDS - PostgreSQL
    // This automatically stores username/password in AWS Secrets Manager.
    const dbInstance = new rds.DatabaseInstance(this, 'PostgresDB', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_14,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      allocatedStorage: 20,
      maxAllocatedStorage: 100,
      publiclyAccessible: false, // best practice for production
      multiAz: false,
      databaseName: 'disaster_relief_db',
      credentials: rds.Credentials.fromGeneratedSecret('postgres'), // Secrets Manager
    });

    // 3) ECS Cluster
    const cluster = new ecs.Cluster(this, 'MyCluster', {
      vpc,
    });

    // 4) Fargate Service + ALB
    // We'll build the container from a local Dockerfile (../../app) or from your own ECR repo.
    const fargateService =
      new ecs_patterns.ApplicationLoadBalancedFargateService(
        this,
        'FargateService',
        {
          cluster,
          cpu: 256,
          desiredCount: 1,
          memoryLimitMiB: 512,
          publicLoadBalancer: true, // Creates a public ALB
          taskImageOptions: {
            // If your Dockerfile is in "../app" relative to the cdk directory, you can do:
            image: ecs.ContainerImage.fromAsset('../app'),
            containerPort: 3000,

            // Pass environment variables (non-secret) directly:
            environment: {
              // For example, you might pass the DB host or schema name
              // We'll handle the password below using Secrets Manager
              DB_NAME: 'disaster_relief_db',
            },

            // Provide the DB password from Secrets Manager as an env variable
            secrets: {
              DB_PASSWORD: ecs.Secret.fromSecretsManager(
                dbInstance.secret!,
                'password'
              ),
            },
          },
        }
      );

    // 5) Security & Connectivity
    // Allow the Fargate tasks to connect to RDS on the default Postgres port
    dbInstance.connections.allowDefaultPortFrom(fargateService.service);

    // 6) Optionally, grant the ECS task read access to the entire secret (username, etc.)
    dbInstance.secret?.grantRead(fargateService.taskDefinition.taskRole);

    // If you prefer the full connection string as a single secret, you can also assemble or store it in Secrets Manager.

    // Done! CDK will create:
    // - VPC
    // - RDS Postgres
    // - ECS Cluster + Fargate Service + ALB
    // - All necessary security groups
  }
}
