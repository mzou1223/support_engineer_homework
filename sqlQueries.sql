-- SQL Queries:
-- How many organizations do not have account plans?
SELECT COUNT(*) 
FROM organization
WHERE id NOT IN(SELECT organizationId FROM account)

-- How many organizations have more than one account plan?
SELECT COUNT(DISTINCT organization.id)
FROM organization
WHERE organization.id IN(
    SELECT account.organizationId 
    FROM account
    GROUP BY account.organizationId
    HAVING COUNT(*) > 1)

-- List all organizations that have only one account plan.
SELECT account.organizationId, organization.orgName 
FROM account
JOIN organization ON account.organizationId = organization.id
GROUP BY account.organizationId, organization.orgName
HAVING COUNT(*) = 1

-- List all organizations that have the PASSWORDLESS feature set to true.
SELECT organizationId
FROM account

