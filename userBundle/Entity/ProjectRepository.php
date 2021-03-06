<?php

namespace eclore\userBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * ProjectRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class ProjectRepository extends EntityRepository
{
    public function getAvailableProjects()
    {// returns projects enabled with count(applications)< required
        $qb = $this->_em->createQueryBuilder();
        $projects = $qb->select('n')
            ->from($this->_entityName, 'n')
            ->where('n.enabled = :enabled')
            ->setParameter('enabled', true)
            ->getQuery()->getResult();
        foreach($projects as $proj)
            if($proj->getPAByStatus('VALIDATED')->count() >= $proj->getRequired())
                $projects->remove($proj);
        return $projects;
    }
}
