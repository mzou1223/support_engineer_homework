-- SQL Queries:
-- How many organizations do not have account plans?
SELECT COUNT(*) 
FROM organizationorm
WHERE id NOT IN(SELECT organizationId FROM accountplanorm)

-- How many organizations have more than one account plan?
SELECT COUNT(*)
FROM organizationorm
WHERE organizationID IN(
    SELECT organizationID 
    FROM accountplanorm
    GROUP BY organizationID
    HAVING COUNT(*) > 1)

-- List all organizations that have only one account plan.
SELECT organizationID 
FROM accountplanorm
GROUP BY organizationID
HAVING COUNT(*) = 1

-- List all organizations that have the PASSWORDLESS feature set to true.
SELECT organizationID
FROM accountplanorm
WHERE features ->> "PASSWORDLESS" = "true"
